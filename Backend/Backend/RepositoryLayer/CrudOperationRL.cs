using Backend.CommonLayer.Model;
using System.Data.SqlClient;

namespace Backend.RepositoryLayer
{


    public class CrudOperationRL : ICrudOperationRL
    {
        public readonly IConfiguration _configuration;
        public readonly SqlConnection _sqlConnection;

        public CrudOperationRL(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration["ConnectionStrings:DBSettingConnection"]);
        }
        public async Task<CreateRecordResponse> CreateRecord(CreateRecordRequest request)
        {
            CreateRecordResponse response = new CreateRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {
                // Insert record into Person table
                string personSqlQuery = "INSERT INTO Person (FirstName, LastName, Contact, Email, DateOfBirth) OUTPUT INSERTED.ID VALUES (@FirstName, @LastName, @Contact, @Email, @DateOfBirth)";
                using (SqlCommand personSqlCommand = new SqlCommand(personSqlQuery, _sqlConnection))
                {
                    personSqlCommand.CommandType = System.Data.CommandType.Text;
                    personSqlCommand.CommandTimeout = 180;
                    personSqlCommand.Parameters.AddWithValue("@FirstName", request.FirstName);
                    personSqlCommand.Parameters.AddWithValue("@LastName", request.LastName);
                    personSqlCommand.Parameters.AddWithValue("@Contact", request.Contact);
                    personSqlCommand.Parameters.AddWithValue("@Email", request.Email);
                    personSqlCommand.Parameters.AddWithValue("@DateOfBirth", request.DateOfBirth);

                    await _sqlConnection.OpenAsync();
                    int personId = Convert.ToInt32(await personSqlCommand.ExecuteScalarAsync());

                    // Insert record into Student table
                    string studentSqlQuery = "INSERT INTO Student (RegistrationNo, Id) VALUES (@RegistrationNo, @Id)";
                    using (SqlCommand studentSqlCommand = new SqlCommand(studentSqlQuery, _sqlConnection))
                    {
                        studentSqlCommand.CommandType = System.Data.CommandType.Text;
                        studentSqlCommand.CommandTimeout = 180;
                        studentSqlCommand.Parameters.AddWithValue("@RegistrationNo", request.RegistrationNo);
                        studentSqlCommand.Parameters.AddWithValue("@Id", personId);
                        int studentStatus = await studentSqlCommand.ExecuteNonQueryAsync();

                        if (studentStatus <= 0)
                        {
                            response.IsSuccess = false;
                            response.Message = "Something Went Wrong";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return response;
        }


        public async Task<ReadRecordResponse> ReadRecord()
        {
            ReadRecordResponse response = new ReadRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {
                string SqlQuery = "SELECT s.Id, s.RegistrationNo, p.FirstName, p.LastName, p.Contact, p.Email, p.DateOfBirth, p.Gender FROM Person p INNER JOIN Student s ON p.Id = s.Id";
                using (SqlCommand sqlCommand = new SqlCommand(SqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    await _sqlConnection.OpenAsync();
                    using (SqlDataReader sqlDataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (sqlDataReader.HasRows)
                        {
                            response.readRecordData = new List<ReadRecordData>();
                            while (await sqlDataReader.ReadAsync())
                            {
                                ReadRecordData dbData = new ReadRecordData();
                                dbData.Id = sqlDataReader["Id"] != DBNull.Value ? Convert.ToInt32(sqlDataReader["Id"]) : 0;
                                dbData.RegistrationNo = sqlDataReader["RegistrationNo"] != DBNull.Value ? sqlDataReader["RegistrationNo"].ToString() : string.Empty;

                                dbData.FirstName = sqlDataReader["FirstName"] != DBNull.Value ? sqlDataReader["FirstName"].ToString() : string.Empty;
                                dbData.LastName = sqlDataReader["LastName"] != DBNull.Value ? sqlDataReader["LastName"].ToString() : string.Empty;
                                dbData.Contact = sqlDataReader["Contact"] != DBNull.Value ? sqlDataReader["Contact"].ToString() : string.Empty;
                                dbData.Email = sqlDataReader["Email"] != DBNull.Value ? sqlDataReader["Email"].ToString() : string.Empty;
                                dbData.DateOfBirth = sqlDataReader["DateOfBirth"] != DBNull.Value ? Convert.ToDateTime(sqlDataReader["DateOfBirth"]) : DateTime.MinValue;
                                dbData.Gender = sqlDataReader["Gender"] != DBNull.Value ? Convert.ToInt32(sqlDataReader["Gender"]) : 0;
                                
                                response.readRecordData.Add(dbData);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return response;
        }




    }


}
