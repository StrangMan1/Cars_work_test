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
            var car1Points = ReadPointsFromFile("wwwroot/data/Points1.txt");
            var car2Points = ReadPointsFromFile("wwwroot/data/Points2.txt");

            var model = new { Car1 = car1Points, Car2 = car2Points };

            return View(model);
        }

        private List<Point> ReadPointsFromFile(string filePath)
        {
            var points = new List<Point>();

            using (var reader = new StreamReader(filePath))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    var parts = line.Split(',');
                    if (parts.Length == 2 && int.TryParse(parts[0], out int x) && int.TryParse(parts[1], out int y))
                    {
                        points.Add(new Point { X = x, Y = y });
                    }
                }
            }

            return points;
        }
        
    }
}