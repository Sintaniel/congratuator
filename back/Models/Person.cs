using System;
using Microsoft.EntityFrameworkCore;

namespace back.Models
{
    public class Person
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public DateTime BirthDate { get; set; }

        public string email { get; set; }

        public string photoLink { get; set; }
    }
}