using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Project.Entity
{
    public abstract class EntityBase : IEntity
    {
       
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 1)]
        public int ID { get; set; }

    }
}
