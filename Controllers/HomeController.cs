using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ZofyaManagementMVC.Models;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ZofyaManagementMVC.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
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

    public async Task<IActionResult> LogOut()
    {
                
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);             

        return RedirectToAction("Index", "Management");
    }    

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
