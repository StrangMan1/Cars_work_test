namespace Cars.Models
{
    public static class CarModel
    {
        public static List<Point> Car1Points { get; private set; }
        public static List<Point> Car2Points { get; private set; }

        static CarModel()
        {
            Car1Points = ReadPointsFromFile("wwwroot/data/Points1.txt");
            Car2Points = ReadPointsFromFile("wwwroot/data/Points2.txt");
        }

        private static List<Point> ReadPointsFromFile(string filePath)
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
    
