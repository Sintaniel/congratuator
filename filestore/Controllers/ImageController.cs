using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using filestore.Models;
using Microsoft.EntityFrameworkCore;
using  Npgsql.EntityFrameworkCore.PostgreSQL;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using Microsoft.AspNetCore.Hosting;

namespace filestore.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageContext _context;

        public ImageController(ImageContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetAll()
        {
            return await _context.Images.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetById(long id)
        {
            var item = await _context.Images.FindAsync(id);
            var image = System.IO.File.OpenRead(item.Path);
            if (item == null)
            {
                return new NotFoundResult();
            }
            return File(image, "image/jpeg");
        }

         [HttpPost]
        public async Task<ActionResult<Image>> PostImage()
        {
            string path = "./Storage/";
            if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

            var postedFile = HttpContext.Request.Form.Files[0];
            string filePath = Path.Combine(path, postedFile.FileName);
            using (Stream fileStream = new FileStream(filePath, FileMode.Create)) {
                    await postedFile.CopyToAsync(fileStream);
                }
            Image image = new Image();
            image.Path = filePath;
            _context.Images.Add(image);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetById), new {id = image.Id}, image);
        }
    }
}
