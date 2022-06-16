using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaManagementMVC.Models;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ZofyaManagementMVC.Controllers;

public class ManagementController : Controller
{

    private readonly ILogger<HomeController> _logger;    

    public ManagementController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {

        return View();
    }

    [HttpPost]
    public async Task<IActionResult> LogIn(staff staff)
    {

        var staffEmailField = staff.Email;
        var staffPasswordField = staff.Password;

        if ((!String.IsNullOrEmpty(staffEmailField)) && (!String.IsNullOrEmpty(staffPasswordField)))
        {


            string staffPassword = Encrypt.GetSHA256(staff.Password);
            staff.Password = staffPassword;
            
            var staffFound = await PostFindStaffAsync(staff.Email, staff.Password);


            if (staffFound != null)
            {


                ViewBag.InvalidCredentialsManagement = "";
                var claims = new List<Claim>{

                    new Claim("Email", staff.Email),
                    new Claim("Name", staffFound.FullName),
                    new Claim("ID", staffFound.RFC)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity),
                                                new AuthenticationProperties { ExpiresUtc = DateTime.Now.AddMinutes(5), IsPersistent = true });

                
                return RedirectToAction("Index", "Home");

            }
            else
            {
                ViewBag.InvalidCredentialsManagement = "Invalid email and/or password";

                return View("Views/Management/Index.cshtml");
            }
        }
        else
        {

            if (!ModelState.IsValid)
            {

                return View("Views/Management/Index.cshtml");
            }

            return View("Views/Management/Index.cshtml");

        }
    }

    public async Task<staff> PostFindStaffAsync(string email, string password)
    {

        staff staff = new staff();

        try
        {

            var handler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback =
                    HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };


            HttpClient client = new HttpClient(handler);
            client.BaseAddress = new Uri("https://localhost:7004/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.PostAsJsonAsync(
                            "PostFindStaff", new { Email = email.ToString(), Password = password.ToString() });

            if (response.IsSuccessStatusCode)
            {
                staff = await response.Content.ReadAsAsync<staff>();
            }

        }
        catch (Exception e)
        {
            System.Console.Error.WriteLine(e);
        }

        return staff;
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
