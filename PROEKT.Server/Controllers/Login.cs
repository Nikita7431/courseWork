using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using PROEKT.Server;
using MySql.Data.MySqlClient;
using static PROEKT.Server.Controllers.MotorcycleController;
using System.Security.Cryptography;
using System.Reflection.PortableExecutable;
using Org.BouncyCastle.Crypto;
using System.Xml.Linq;

namespace L3.Server.Controllers
{
    class MessagePeople
    {
       public string MesPeople { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class Auth : ControllerBase
    {


        //private List<LoginModel> peoples = new List<LoginModel>
        //{
        //    new LoginModel {Login="admin@gmail.com", Password="12345", Role = "admin" },
        //    new LoginModel { Login="qwerty@gmail.com", Password="55555", Role = "user" }
        //};

        [HttpGet("loginPeople")]
        public IActionResult GetLoginPeople()
        {
            
            return Ok(new{LoginPeople.Name, LoginPeople.Phone, LoginPeople.Adress,LoginPeople.Email, LoginPeople.Job_title, LoginPeople.Login,LoginPeople.Password, LoginPeople.Id});
        }

        [HttpPost("UpLogin")]
        public IActionResult GetUpLoginPeople([FromBody] RegPeopleModel model)
        {
            Console.WriteLine($"{model.Login}, {model.Email}, {model.Phone}, {model.Adress}, {model.Job_title}, {model.Id}");
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            string tableName = "entry";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query1 = "UPDATE entry SET login = @Login, password = @Password WHERE idUser = @Id";
                string query2 = "UPDATE user SET name = @Name, phone = @Phone, adress = @Adress, email = @Email WHERE idUser = @Id";

                using (MySqlCommand cmd1 = new MySqlCommand(query1, connection))
                {
                    cmd1.Parameters.AddWithValue("@Login", model.Login);
                    cmd1.Parameters.AddWithValue("@Password", model.Password);
                    cmd1.Parameters.AddWithValue("@Id", model.Id);

                    int rowsAffected1 = cmd1.ExecuteNonQuery();
                    Console.WriteLine($"Updated {rowsAffected1} rows in 'entry' table.");
                }

                using (MySqlCommand cmd2 = new MySqlCommand(query2, connection))
                {
                    cmd2.Parameters.AddWithValue("@Name", model.Name);
                    cmd2.Parameters.AddWithValue("@Phone", model.Phone);
                    cmd2.Parameters.AddWithValue("@Adress", model.Adress);
                    cmd2.Parameters.AddWithValue("@Email", model.Email);
                    cmd2.Parameters.AddWithValue("@Id", model.Id);

                    int rowsAffected2 = cmd2.ExecuteNonQuery();
                    Console.WriteLine($"Updated {rowsAffected2} rows in 'user' table.");
                }

                connection.Close();
            }

            return Ok();
            
        }

        [HttpPost("DelLogin")]
        public IActionResult GetDelLoginPeople([FromBody] RegPeopleModel model)
        {
            Console.WriteLine(model.Login, model.Email, model.Phone, model.Adress, model.Job_title, model.Id);
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            string tableName = "entry";
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    MySqlCommand cmd = new MySqlCommand($"DELETE FROM entry WHERE idUser = {model.Id}", connection);
                    MySqlCommand cmd2 = new MySqlCommand($"DELETE FROM post WHERE idUser = {model.Id}", connection);
                    MySqlCommand cmd3 = new MySqlCommand($"DELETE FROM user WHERE idUser = {model.Id}", connection);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    cmd2.ExecuteNonQuery();
                    cmd3.ExecuteNonQuery();
                    connection.Close();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            return Ok();

        }


        [HttpPost("newLogin")]
        public IActionResult GetNewLoginPeople([FromBody] RegPeopleModel model)
        {
            Console.WriteLine(model.Login,model.Email,model.Phone,model.Adress,model.Job_title,model.Id);
            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            string tableName = "entry";
            

            List<int> ids = GetIdsFromTable(connectionString, tableName);
            ids.Sort();
            int maxNumber = ids[ids.Count - 1];

            model.Id = maxNumber+1;

            MessagePeople messagePeople = new MessagePeople();

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {

                try
                {
                    connection.Open();
         


                    MySqlCommand cmd2 = new MySqlCommand($"INSERT INTO post (idUser, job_title) VALUES ('{model.Id}', '{model.Job_title}')", connection);
                    cmd2.ExecuteNonQuery();

                    MySqlCommand cmd3 = new MySqlCommand($"INSERT INTO user (idUser, name,phone,adress,email) VALUES ('{model.Id}','{model.Name}','{model.Phone}','{model.Adress}','{model.Email}')", connection);
                    cmd3.ExecuteNonQuery();

                    MySqlCommand cmd4 = new MySqlCommand($"INSERT INTO entry (idUser,login,password) VALUES ('{model.Id}','{model.Login}','{model.Password}')", connection);
                    cmd4.ExecuteNonQuery();

                    connection.Close();

                }
                catch (MySqlException ex)
                {
                    if (ex.Number == 1062)
                    {

                        return Ok("Значение id, логина или пароля имеет дубликаты у сотрудников.");
                    }
                    else
                    {

                        return Ok($"Ошибка DataBase: {ex.Message}");
                    }

                }
                messagePeople.MesPeople = "Вы прошли регистрацию";


                return Ok(messagePeople);
            }

        
        static List<int> GetIdsFromTable(string connectionString, string tableName)
            {
                List<int> ids = new List<int>();

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = $"SELECT idUser FROM {tableName}";

                    using (MySqlCommand cmd = new MySqlCommand(query, connection))
                    {
                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ids.Add(reader.GetInt32(0));
                            }
                        }
                    }
                }

                return ids;
            }
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel1 model)
        {
            string login = model.Login;
            string password = model.Password;

            string connectionString = "SERVER=localhost;DATABASE=motorcycle_shop;UID=root;PASSWORD=12345;";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {

                Console.WriteLine(login);
                Console.WriteLine(password);
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM entry WHERE login = @login AND password = @password", connection);
                cmd.Parameters.AddWithValue("@login", login);
                cmd.Parameters.AddWithValue("@password", password);

                connection.Open();
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        if (reader.HasRows)
                        {
                            LoginPeople.Id = reader.GetInt16("idUser");
                            LoginPeople.Login = login;
                            LoginPeople.Password = password;

                        }
                    }

                    connection.Close();
                }

                MySqlCommand cmd2 = new MySqlCommand("SELECT * FROM user WHERE idUser = @id", connection);
                cmd2.Parameters.AddWithValue("@id", LoginPeople.Id);

                connection.Open();
                using (MySqlDataReader reader2 = cmd2.ExecuteReader())
                {
                    while (reader2.Read())
                    {
                        if (reader2.HasRows)
                        {
                            LoginPeople.Name = reader2.GetString("name");
                            LoginPeople.Phone = reader2.GetString("phone");
                            LoginPeople.Adress = reader2.GetString("adress");
                            LoginPeople.Email = reader2.GetString("email");


                        }
                    }

                }
                connection.Close();

                MySqlCommand cmd3 = new MySqlCommand("SELECT * FROM post WHERE idUser = @id", connection);
                cmd3.Parameters.AddWithValue("@id", LoginPeople.Id);

                connection.Open();
                using (MySqlDataReader reader3 = cmd3.ExecuteReader())
                {
                    while (reader3.Read())
                    {
                        if (reader3.HasRows)
                        {
                            LoginPeople.Job_title = reader3.GetString("job_title");

                        }
                    }
                }
                connection.Close();



                ///////


                Console.WriteLine(login);
                Console.WriteLine(password);

                var now = DateTime.UtcNow;
                var identity = GetIdentity(login, password);

                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: identity.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    username = identity.Name
                };
                return Ok(response);
                //if (email == "yudin" && password == "12345")
                //{
                //    return Ok(response);
                //}
                //else
                //{
                //    return BadRequest("Invalid email or password");
                //}
            }
             ClaimsIdentity GetIdentity(string login, string password)
             {
                LoginModel person = new LoginModel()
                { Login = login,
                    Password = password
                };
                if (person != null)
                {
                    var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                   
                };
                    ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                    return claimsIdentity;
                }


                return null;
            }
        }

       

        public static class LoginPeople
        {
            public static int Id { get; set; }
            public static string Name { get; set; }
            public static string Login { get; set; }
            public static string Password { get; set; }
            public static string Phone { get; set; }
            public static string Adress { get; set; }
            public static string Email { get; set; }
            public static string Job_title { get; set; }

        }

        public  class RegPeopleModel
        {
            public  int Id { get; set; }
            public  string Name { get; set; }
            public  string Login { get; set; }
            public  string Password { get; set; }
            public  string Phone { get; set; }
            public  string Adress { get; set; }
            public  string Email { get; set; }
            public  string Job_title { get; set; }

        }


        public class LoginModel1
        {
            public string Login { get; set; }
            public string Password { get; set; }
        }

        public class LoginModel
        {
            public string Login { get; set; }
            public string Password { get; set; }
           
        }

        public class MotoModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Price { get; set; }
            public string Text { get; set; }
            public IFormFile Image { get; set; }


        }
        public class MotoModel2
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Price { get; set; }
            public string Text { get; set; }
          


        }

    } 
}

  
