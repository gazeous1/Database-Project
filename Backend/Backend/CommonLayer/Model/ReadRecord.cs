namespace Backend.CommonLayer.Model
{
    public class ReadRecordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

        public List<ReadRecordData> readRecordData { get; set; }
    }


    public class ReadRecordData
    {
        public int Id { get; set; }
        public string RegistrationNo { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Contact { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int Gender { get; set; }

        
    }
}
