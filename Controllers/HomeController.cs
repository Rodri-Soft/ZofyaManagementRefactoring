using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaManagementMVC.Models;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

using System.Net.Http.Headers;

namespace ZofyaManagementMVC.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public async Task<IActionResult> Index()
    {
        await UpdateUserInformation();
        SetUser();         

        return View();
    }   

    public void SetUser()
    {
        Claim userClaim = HttpContext.User.Claims.FirstOrDefault();
        
        if (userClaim != null)
        {            
            Claim userNameClaim = HttpContext.User.Claims.ElementAt(1);
            string userName = userNameClaim.Value;
            ViewData["UserManagement"] = userName;   

            Claim userEmailClaim = HttpContext.User.Claims.ElementAt(0);                        
            string userEmail = userEmailClaim.Value;           

            ViewData["UserManagementEmail"] = userEmail;                                           
        
        }
        else
        {
            ViewData["UserManagement"] = "Account";                
        }            
    }

    public async Task<IActionResult> UpdateUserInformation()
    {
        Claim userClaim = HttpContext.User.Claims.FirstOrDefault();
        staff updatedStaff = new staff();
        string userEmail = "";
        
        if (userClaim != null)
        {                       

            Claim userEmailClaim = HttpContext.User.Claims.ElementAt(0);                        
            userEmail = userEmailClaim.Value;                                                             
        
        }
        else
        {
            ViewData["UserManagement"] = "Account";                
        }                  

        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);   

        updatedStaff = await PostFindStaffEmailAsync(userEmail);

        var claims = new List<Claim>{

            new Claim("Email", updatedStaff.Email),
            new Claim("Name", updatedStaff.FullName),
            new Claim("RFC", updatedStaff.RFC)
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity),
                                        new AuthenticationProperties { ExpiresUtc = DateTime.Now.AddMinutes(5), IsPersistent = true });
        
        
        return RedirectToAction("Index", "Home");
    }
    
    public async Task<IActionResult> LogOut()
    {
                
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);             

        return RedirectToAction("Index", "Management");
    }    

    public async Task<staff> PostFindStaffEmailAsync(string email)
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
                            "PostFindStaffEmail", new { ID = email.ToString() });

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
