using Azure.Storage.Blobs;
using Iteration5.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(x => new BlobServiceClient(builder.Configuration.GetConnectionString("AzureBlobConnectionString") ) );

builder.Services.AddCors(options => options.AddDefaultPolicy(
                include =>
                {
                    include.AllowAnyOrigin();
                    include.AllowAnyHeader();
                    include.AllowAnyMethod();
                    include.AllowAnyOrigin();
                }));


//Services 
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IHelpTipRepository, HelpTipRepository>();
builder.Services.AddScoped<IUserRoleRepository, UserRoleRepository>();
builder.Services.AddScoped<IBlobRepository, BlobRepository > ();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS middleware
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
