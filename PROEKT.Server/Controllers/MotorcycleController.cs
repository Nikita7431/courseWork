using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using MySql.Data.MySqlClient;
using static L3.Server.Controllers.Auth;

namespace PROEKT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotorcycleController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetMotorcycles()
        {
            List<Motorcycle> motorcycles = new List<Motorcycle>();
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    MySqlCommand cmd = new MySqlCommand("SELECT * FROM motorcycle", connection);
                    connection.Open();

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Motorcycle motorcycle = new Motorcycle
                            {
                                idMotorcycle = reader.GetInt32("idMotorcycle"),
                                Name = reader.GetString("name"),
                                Text = reader.GetString("text"),
                                Price = reader.GetString("price"),
                                Image = reader.GetString("Image")
                            };

                            motorcycles.Add(motorcycle);
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                return StatusCode(500, $"Database error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }

            return Ok(motorcycles);
        }
        

        [HttpPost("UpdateMoto")]
        public async Task<IActionResult> UpdateMoto([FromForm] MotoModel model)
        {
            //Console.WriteLine(login);
            //Console.WriteLine(password);

            SaveImage(model.Image);
            string imageName = Path.Combine(new String(Path.GetFileNameWithoutExtension(model.Image.FileName).ToArray()).Replace(' ', '-'), ".jpg");
            string imgUrl = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);

            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand cmd = new MySqlCommand($"UPDATE motorcycle SET  Name = '{model.Name}', Price = '{model.Price}',Text = '{model.Text}', Image = '{imgUrl}' WHERE idMotorcycle = {model.Id}", connection);
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
            }
            return Ok();
        }

        [HttpPost("DeleteMoto")]
        public async Task<IActionResult> DeleteMoto([FromBody] DelMotoModel model)
        {
            Console.WriteLine(model.Id);
            //Console.WriteLine(password);
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand cmd = new MySqlCommand($"DELETE FROM motorcycle WHERE idMotorcycle = {model.Id}", connection);
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
            }
            return Ok();
        }

        [HttpPost("NewMoto")]
        public async Task<IActionResult> NewMoto([FromForm] MotoModel model)
        {
            //Console.WriteLine(login);
            //Console.WriteLine(password);

            SaveImage(model.Image);
            string imageName = Path.Combine(new String(Path.GetFileNameWithoutExtension(model.Image.FileName).Take(10).ToArray()).Replace(' ', '-'), ".jpg");
            string imgUrl = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
           
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand cmd = new MySqlCommand($"INSERT INTO motorcycle (idMotorcycle, Name,Price,Text,Image) VALUES ('{model.Id}', '{model.Name.Replace(' ', '-')}','{model.Price}','{model.Text}','{imgUrl}')", connection);
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
            }
            return Ok();
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
           // imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine("E:\\Никита Политех(Учеба\\Работы\\PROEKT\\PROEKT.Server\\wwwroot\\", $"{imageName}.jpg");
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        public class DelMotoModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Price { get; set; }
            public string Text { get; set; }
           


        }

        public class Motorcycle
        {
            public int idMotorcycle { get; set; }
            public string Name { get; set; }
            public string Price { get; set; }
            public string Text { get; set; }
            public string Image { get; set; }
        }
    }
}
