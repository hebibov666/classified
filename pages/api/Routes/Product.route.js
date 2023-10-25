const express=require("express");
const router=express.Router();
const Product=require("../Product.model.js")
const multer=require('multer')
const cloudinary=require("../cloudinary.js")
const storage=multer.diskStorage({
  destination:function(req,file,callback){
callback(null,__dirname + "/uploads");
  },
  filename:function(req,file,callback){
    callback(null,file.originalname)
  }
})
const uploads=multer({storage:storage});
router.get('/',async (req,res,next)=>{
    try {
        const products = await Product.find();
    
        res.status(200).json(products); 
      } catch (error) {
        next(error);
      }
})
router.post('/', uploads.array("files"), (req, res, next) => {
  const images = req.files.map((file) => file.path);
  // Tüm resimleri Cloudinary'ye yükle
  const uploadedImageIds = [];
  const promises = [];

  images.forEach((imagePath, index) => {
    promises.push(new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imagePath, { public_id: `urun_resim_${Date.now()}_${index}` }, (error, result) => {
        if (error) {
          console.error('Resim yükleme hatası: ', error);
          reject(error);
        } else {
          const publicId = result.public_id;
          uploadedImageIds.push(publicId);
          resolve(publicId);
        }
      });
    }));
  });

  Promise.all(promises)
    .then(() => {
      const product = new Product({
        name: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        model:req.body.model,
        color:req.body.color,
        userId: req.body.userid,
        image: uploadedImageIds, 
      });

      product.save()
        .then(savedProduct => {
          res.json(savedProduct);
        })
        .catch(err => {

          res.status(500).json({ message: 'Meshul qeyd edilmədi' });
        });
    })
    .catch(error => {
      res.status(500).json({ message: 'Resimler yüklenemedi' });
    });
});


router.get('/:id', async (req, res) => {
  const id = req.params.id; 

  try {
 
    const product = await Product.find({_id:id });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Məhsul tapılmadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Elanlar gətirləmədi' });
  }
});

router.delete('/:id', async (req, res, next) => {
  const productId = req.params.id; 

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    // İlanın resimlerini Cloudinary'den silme
    const imageIds = product.image;
    const deletePromises = imageIds.map((imageId) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(imageId, (error, result) => {
          if (error) {
            console.error('Resim silme hatası: ', error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });

    // Tüm resimlerin silinmesini bekleyin
    await Promise.all(deletePromises);

    // İlanı veritabanından sil
    await Product.findByIdAndRemove(productId);

    res.json({ message: 'İlan başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'İlan silinme işlemi başarısız oldu' });
  }
});


router.patch('/:id',(req,res,next)=>{
res.send("Update a product")
})
module.exports=router