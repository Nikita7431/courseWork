using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using static L3.Server.Controllers.Auth;
using static PROEKT.Server.Controllers.MotorcycleController;

namespace PROEKT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        RegPeopleModel regPeopleModel = new RegPeopleModel();

        public class Booking
        {
            public int idBooking { get; set; }
            public RegPeopleModel regPeopleModel { get; set; }
            public Motorcycle Motorcycle { get; set; }

            public Booking()
            {
                idBooking = 0;
                regPeopleModel = new RegPeopleModel();
                Motorcycle = new Motorcycle();
               
              
            }
        }

        [HttpPost("NewBooking")]
        public async Task<IActionResult> NewMoto([FromForm] MotoModel2 model)
        {
            //Console.WriteLine(login);
            //Console.WriteLine(password);

            regPeopleModel.Id = LoginPeople.Id;
            regPeopleModel.Name = LoginPeople.Name;
            regPeopleModel.Email = LoginPeople.Email;
            regPeopleModel.Phone = LoginPeople.Phone;
            regPeopleModel.Adress = LoginPeople.Adress;


            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand cmd = new MySqlCommand($"INSERT INTO booking (idbooking, idUser,idMotorcycle) VALUES ('{model.Id+ regPeopleModel.Id}', '{regPeopleModel.Id}','{model.Id}')", connection);
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
            }
            return Ok();
        }
        [HttpPost("DelBooking")]
        public async Task<IActionResult> DelMoto([FromForm] MotoModel3 model)
        {
            //Console.WriteLine(login);
            //Console.WriteLine(password);
            //Console.WriteLine(model.Id);
            //Console.WriteLine(password);
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand cmd = new MySqlCommand($"DELETE FROM booking WHERE idMotorcycle = {model.idMoto}", connection);
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
            }
            return Ok();
        }


        [HttpGet]
        public IActionResult GetBookings()
        {
            List<Booking> bookings = new List<Booking>();

            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand cmd = new MySqlCommand("SELECT * FROM booking", connection);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Booking booking = new Booking();
                        booking.Motorcycle = new Motorcycle
                        {
                            idMotorcycle = reader.GetInt32("idMotorcycle")
                        };
                       
                        bookings.Add(booking);
                    }
                }

           
                foreach (var booking in bookings)
                {
                    MySqlCommand cmd2 = new MySqlCommand("SELECT * FROM motorcycle WHERE idMotorcycle = @idMotorcycle", connection);
                    cmd2.Parameters.AddWithValue("@idMotorcycle", booking.Motorcycle.idMotorcycle);
                    using (MySqlDataReader reader2 = cmd2.ExecuteReader())
                    {
                        while (reader2.Read())
                        {
                            booking.Motorcycle.Name = reader2.GetString("Name");
                            booking.Motorcycle.Price = reader2.GetString("Price");
                        }
                    }

                    MySqlCommand cmd3 = new MySqlCommand("SELECT * FROM user WHERE idUser = @idUser", connection);
                    cmd3.Parameters.AddWithValue("@idUser", booking.regPeopleModel.Id);
                    using (MySqlDataReader reader3 = cmd3.ExecuteReader())
                    {
                        if (reader3.Read())
                        {
                            booking.regPeopleModel.Name = reader3.GetString("name");
                            booking.regPeopleModel.Phone = reader3.GetString("phone");
                            booking.regPeopleModel.Email = reader3.GetString("email");
                        }
                    }
                }

                connection.Close();
            }

            return Ok(bookings);
        }
    }

    public class MotoModel3
    {
        //public int idUser { get; set; }
        public int idMoto { get; set; }





    }

}
