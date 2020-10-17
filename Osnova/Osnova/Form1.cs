using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Alturos.Yolo;
using Alturos.Yolo.Model;

namespace Osnova
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public string filePath = string.Empty;

        private void button1_Click(object sender, EventArgs e)
        {
            DialogResult result = openFileDialog1.ShowDialog();
            if (result == DialogResult.OK)
            {
                filePath = openFileDialog1.FileName;
                pictureBox1.Image = Image.FromFile(filePath);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            var configurationDetector = new YoloConfigurationDetector();
            var config = configurationDetector.Detect();

            MemoryStream memoryStream = new MemoryStream();

            pictureBox1.Image.Save(memoryStream, ImageFormat.Jpeg);
            
            using (var yoloWrapper = new YoloWrapper(config))
            {
                //var itemss = yoloWrapper.Detect(@"image.jpg");
                List<YoloItem> items = yoloWrapper.Detect(memoryStream.ToArray()).ToList<YoloItem>();
                Image final = pictureBox1.Image;

                Graphics gr = Graphics.FromImage(final);
                Font font = new Font("Consolas", 10, FontStyle.Bold);
                SolidBrush brush = new SolidBrush(Color.Yellow);

                foreach (YoloItem item in items)
                {
                    Point rectPoint = new Point(item.X, item.Y);
                    Size rectSize = new Size(item.Width, item.Height);

                    Rectangle rect = new Rectangle(rectPoint, rectSize);
                    Pen pen = new Pen(Color.Yellow, 2);
                    gr.DrawRectangle(pen, rect);
                    gr.DrawString(item.Type, font, brush, rectPoint);
                }

                pictureBox1.Image = final;
                //items[0].Type -> "Person, Car, ..."
                //items[0].Confidence -> 0.0 (low) -> 1.0 (high)
                //items[0].X -> bounding box
                //items[0].Y -> bounding box
                //items[0].Width -> bounding box
                //items[0].Height -> bounding box
            }


        }
    }
}
