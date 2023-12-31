using Cars.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Controllers
{

    public class TurnController : Controller
    {
        public JsonResult RotateCar([FromBody] RotateRequest request)
        {
            var rotatedPoints = new List<Point>();

            if (request.Number == 1)
            {
                rotatedPoints = CarModel.Car1Points;

            }
            else
            {
                rotatedPoints = CarModel.Car2Points;

            }
            rotatedPoints = TurnCar(rotatedPoints, request.Value);
            return Json(rotatedPoints);
        }

        private List<Point> TurnCar(List<Point> points, double angleInDegrees)
        {
            var changedPoints = new List<Point>(points.Count);
            Point PointCentr = new Point();
            double Xmax = points.Max(p => p.X);
            double Xmin = points.Min(p => p.X);
            double Ymax = points.Max(p => p.Y);
            double Ymin = points.Min(p => p.Y);

            PointCentr.X = Xmin + (Xmax - Xmin) / 2;
            PointCentr.Y = Ymin + (Ymax - Ymin) / 2;
            double angleInRadians = angleInDegrees * (Math.PI / 180);
            double cosTheta = Math.Cos(angleInRadians);
            double sinTheta = Math.Sin(angleInRadians);
            double dx, dy;

            foreach (var line in points)
            {
                dx = line.X - PointCentr.X;
                dy = line.Y - PointCentr.Y;
                line.X = (dx * cosTheta - dy * sinTheta) + PointCentr.X;
                line.Y = (dx * sinTheta + dy * cosTheta) + PointCentr.Y;
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
