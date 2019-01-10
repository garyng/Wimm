using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wimm.Db
{
	public class User
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string DisplayName { get; set; }
		public string Currency { get; set; }

		public ICollection<Record> Records { get; set; }
		public ICollection<Budget> Budgets { get; set; }

	}

	public class Record
	{
		public int Id { get; set; }
		public decimal Amount { get; set; }
		// income, expense
		public string Type { get; set; }
		public string Description { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }
	}

	public class Category
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public ICollection<Record> Records { get; set; }
	}

	public class Budget
	{
		public int Id { get; set; }

		public int UserId { get; set; }
		public User User { get; set; }

		public int? CategoryId { get; set; }
		// all for all category
		public Category Category { get; set; }
		// just set daily limit, multiple-day limits complicate things
		public decimal LimitPerDay { get; set; }

	}

	public class Recurrence
	{
		public int Id { get; set; }

		public int UserId { get; set; }
		public User User { get; set; }

		public decimal Amount { get; set; }
		public string Type { get; set; }
		public string Description { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }

		// daily, weekly, monthly
		public string Frequency { get; set; }
		
	}

	public class WimmDbContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Record> Records { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Budget> Budgets { get; set; }
		public DbSet<Recurrence> Recurrences { get; set; }
	}

	class Program
	{
		static void Main(string[] args)
		{
		}
	}
}