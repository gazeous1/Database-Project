using Backend.CommonLayer.Model;

namespace Backend.RepositoryLayer
{
    public interface ICrudOperationRL
    {
        public Task<CreateRecordResponse> CreateRecord(CreateRecordRequest request);

        public Task<ReadRecordResponse> ReadRecord();
    }
}
