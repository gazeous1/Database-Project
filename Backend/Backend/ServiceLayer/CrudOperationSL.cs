﻿using Backend.CommonLayer.Model;
using Backend.RepositoryLayer;

namespace Backend.ServiceLayer
{
    public class CrudOperationSL : ICrudOperationSL
    {

        public readonly ICrudOperationRL _crudOperationRL;

        public CrudOperationSL(ICrudOperationRL crudOperationRL)
        {
            _crudOperationRL = crudOperationRL;
        }

        public async Task<CreateRecordResponse> CreateRecord(CreateRecordRequest request)
        {
            return await _crudOperationRL.CreateRecord(request);
        }

        public async Task<ReadRecordResponse> ReadRecord()
        {
            return await _crudOperationRL.ReadRecord();
        }
    }
}
