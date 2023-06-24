using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project.Entity
{
	public interface IEntity
	{
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 1)]
        int ID { get; set; }
	}
}

