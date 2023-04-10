namespace Backend.CommonLayer.Model
{
    public class CreateRecordRequest
    {

        public string RegistrationNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Contact { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int Gender { get; set; }

    }
    public class CreateRecordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

    }
}
