using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using back.Models;

namespace back.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PosgresContext _context;

        public PersonController(PosgresContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetAll()
        {
            return await _context.Persons.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetById(long id)
        {
            var item = await _context.Persons.FindAsync(id);
            if (item == null)
            {
                return new NotFoundResult();
            }
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = person.Id}, person);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Person>> PutPerson(long id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }catch
            {
                if (!(_context.Persons.Any(e => e.Id.Equals(id))))
                {
                    return NotFound();
                }else
                {
                    throw new Exception();
                }
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Person>> DeletePerson(long id)
        {
            var removedPerson = await _context.Persons.FindAsync(id);
            if (removedPerson == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(removedPerson);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}