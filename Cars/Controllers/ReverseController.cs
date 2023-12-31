using Cars.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Controllers
{
    public class ReverseController : Controller
    {
        public JsonResult ModifyCar([FromBody] NumberInput NumberCar)
        {
            var ReverswPoints = new List<Point>();

            if (NumberCar.Number == 1 )
            {
                ReverswPoints = CarModel.Car1Points;

            }
            else
            {
                ReverswPoints = CarModel.Car2Points;

            }
            ReverswPoints = ReversoCar(ReverswPoints);
            return Json(ReverswPoints);
        }

        private List<Point> ReversoCar(List<Point> points)
        {
            var changedPoints = new List<Point>(points.Count);
            double Xmax = 0, Xmin = points[1].X, Xcentr;
            foreach (var line in points)
            {
                if (line.X > Xmax)
                {
                    Xmax = line.X;
                }
                else if (line.X < Xmin)
                {
                    Xmin = line.X;
                }
            }
            Xcentr = Xmin + (Xmax - Xmin) / 2;
            double diameter = 0;
            foreach (var line in points)
            {
                if (line.X > Xcentr)
                {
                    diameter = 2 * (line.X - Xcentr);
                    line.X = line.X - diameter;
                }
                else if (line.X < Xcentr)
                {
                    diameter = -2 * (line.X - Xcentr);
                    line.X = line.X + diameter;
                }
                changedPoints.Add(new Point
                {
                    X = (int)(line.X),
                    Y = (int)(line.Y)
                });
            }
            return changedPoints;
        }
    }
}
