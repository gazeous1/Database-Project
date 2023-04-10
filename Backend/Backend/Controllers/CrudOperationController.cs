using Backend.CommonLayer.Model;
using Backend.ServiceLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudOperationController : ControllerBase
    {
        public readonly ICrudOperationSL _crudOperationSL; 


        public CrudOperationController(ICrudOperationSL crudOperationSL)
        {
            _crudOperationSL = crudOperationSL;
        }

        [HttpPost]
        [Route("CreateRecord")]
        public async Task<IActionResult> CreateRecord(CreateRecordRequest request)
        {

            CreateRecordResponse response = null;

            try
            {
                response = await _crudOperationSL.CreateRecord(request);

            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok (response);
        }

        [HttpGet]
        [Route("ReadRecord")]

        public async Task<IActionResult> ReadRecord()
        {
            ReadRecordResponse response = null;
            

            try
            {
               response = await _crudOperationSL.ReadRecord();

            }
            catch (Exception ex)
            {
               
            }

           return Ok(response);
        }






    }
}
