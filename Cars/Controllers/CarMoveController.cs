using Cars.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Controllers
{
    public class CarMoveController : Controller
    {
        public JsonResult Move([FromBody] ButtonData data)
        {
            var points = new List<Point>();

            switch (data.Name)
            {
                case "car1-left":
                    data.Speed = -data.Speed;
                    points = MoveCarX(CarModel.Car1Points, data.Speed);
                    break;
                case "car2-left":
                    data.Speed = -data.Speed;
                    points = MoveCarX(CarModel.Car2Points, data.Speed);
                    break;
                case "car1-right":
                    points = MoveCarX(CarModel.Car1Points, data.Speed);
                    break;
                case "car2-right":
                    points = MoveCarX(CarModel.Car2Points, data.Speed);
                    break;
                case "car1-down":
                    data.Speed = -data.Speed;
                    points = MoveCarY(CarModel.Car1Points, data.Speed);
                    break;
                case "car2-down":
                    data.Speed = -data.Speed;
                    points = MoveCarY(CarModel.Car2Points, data.Speed);
                    break;
                case "car1-up":
                    points = MoveCarY(CarModel.Car1Points, data.Speed);
                    break;
                case "car2-up":
                    points = MoveCarY(CarModel.Car2Points, data.Speed);
                    break;
            }

            return Json(points);
        }
        private List<Point> MoveCarX(List<Point> CarPoint, int speed)
        {
            var changedPoints = new List<Point>(CarPoint.Count);
            foreach (var line in CarPoint)
            {
                line.X += speed;
                changedPoints.Add(new Point
                {
                    X = (int)(line.X),
                    Y = (int)(line.Y)
                });
            }
            return changedPoints; 
        }
        private List<Point> MoveCarY(List<Point> CarPoint, int speed)
        {
            var changedPoints = new List<Point>(CarPoint.Count);
            foreach (var line in CarPoint)
            {
                line.Y += speed;
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
