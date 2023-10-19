﻿using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Exam
{
    public int ExamId { get; set; }

    public string Description { get; set; } = null!;

    public int LimitQuestion { get; set; }

    public int LimitKeyQuestion { get; set; }

    public DateTime CreatedTime { get; set; }

    public string CourseId { get; set; } = null!;

    public int StaffId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Staff Staff { get; set; } = null!;

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();
}