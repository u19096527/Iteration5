using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;

namespace Iteration5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpGet]
        [Route("SendEmail")]
        public IActionResult SendEmail()
        {
            try
            {
                //MailMessage mail = new MailMessage();
                //SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                //mail.From = new MailAddress("unibooks.thebookmarket@gmail.com");
                //mail.To.Add("wm.marcelinegerard@gmail.com");
                //mail.Subject = "Test Mail";
                //mail.Body = "This is for testing SMTP mail from GMAIL";
                //SmtpServer.Port = 587;
                //SmtpServer.Credentials = new System.Net.NetworkCredential("unibooks.thebookmarket@gmail.com", "ILoveIceCream123");
                //SmtpServer.EnableSsl = true;
                //SmtpServer.Send(mail);
                //return Ok("Mail sent successfully");

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("unibooks.thebookmarket@gmail.com");
                mail.To.Add("wm.marcelinegerard@gmail.com");
                mail.Subject = "Test Mail";
                mail.Body = "This is for testing SMTP mail from GMAIL";
                SmtpServer.Port = 587;
                SmtpServer.UseDefaultCredentials = false; // Make sure to set this to false
                SmtpServer.Credentials = new System.Net.NetworkCredential("unibooks.thebookmarket@gmail.com", "ILoveIceCream123");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return Ok("Mail sent successfully");
                //MessageBox.Show("mail Send");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
                //MessageBox.Show(ex.ToString());
            }

        }
    }
}
