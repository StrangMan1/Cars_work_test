using Cars.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace Cars.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var model = new { Car1 = CarModel.Car1Points, Car2 = CarModel.Car2Points };

            return View(model);
        }
        
    }
}