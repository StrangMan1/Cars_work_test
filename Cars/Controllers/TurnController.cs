using Microsoft.AspNetCore.Mvc;

namespace Cars.Controllers
{
    public class TurnController : Controller
    {
        public JsonResult RotateCar([FromBody] RotateRequest request)
        {
            var rotatedPoints = TurnCar(request.Model, request.Value);
            return Json(rotatedPoints);
        }

        private List<Point> TurnCar(List<Point> points, double angleInDegrees)
        {
            Point PointCentr = new Point();
            double Xmax = 0, Xmin = points[1].X;
            double Ymax = 0, Ymin = points[1].Y;
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
                if (line.Y > Ymax)
                {
                    Ymax = line.Y;
                }
                else if (line.Y < Ymin)
                {
                    Ymin = line.Y;
                }
            }
            PointCentr.X = Xmin + (Xmax - Xmin) / 2;
            PointCentr.Y = Ymin + (Ymax - Ymin) / 2;
            double angleInRadians = angleInDegrees * (Math.PI / 180);
            double cosTheta = Math.Cos(angleInRadians);
            double sinTheta = Math.Sin(angleInRadians);
            double dx, dy, newX, newY;

            foreach (var line in points)
            {
                dx = line.X - PointCentr.X;
                dy = line.Y - PointCentr.Y;
                line.X = (dx * cosTheta - dy * sinTheta) + PointCentr.X;
                line.Y = (dx * sinTheta + dy * cosTheta) + PointCentr.Y;
            }
            return points;
        }
    }
}
