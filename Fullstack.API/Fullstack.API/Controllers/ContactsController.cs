using Fullstack.API.Data;
using Fullstack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Routing.Constraints;

namespace Fullstack.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly FullstackDbContext _fullStackDbContext;

        public ContactsController(FullstackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _fullStackDbContext.Contacts.ToListAsync();
            return Ok(contacts);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact([FromBody] Contact contactRequest) {

            contactRequest.Id = Guid.NewGuid();
            await _fullStackDbContext.Contacts.AddAsync(contactRequest);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(contactRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetContact([FromRoute] Guid id)
        {
            var contact = await _fullStackDbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, Contact updateContactRequest)
        {
            var contact = await _fullStackDbContext.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            contact.Name = updateContactRequest.Name;
            contact.Email = updateContactRequest.Email;
            contact.PhoneNumber = updateContactRequest.PhoneNumber;

            await _fullStackDbContext.SaveChangesAsync();

            return Ok(contact);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteContact([FromRoute] Guid id)
        {
            var contact = await _fullStackDbContext.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

             _fullStackDbContext.Contacts.Remove(contact);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
