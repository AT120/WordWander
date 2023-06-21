﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.Common.Models.DTO
{
    public class BookShortDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CurrentPercent { get; set; }
        public DateTime LastTime { get; set; }
    }
}
