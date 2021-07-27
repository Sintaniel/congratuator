using System;
using Microsoft.EntityFrameworkCore;

namespace filestore.Models
{
    public class Image
    {
        public long Id { get; set; }

        public string Path { get; set; }
    }
}