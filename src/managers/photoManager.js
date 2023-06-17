const Photo = require('../models/Photo');

const { getErrorMessage } = require('../untils/errorHelpers');


exports.create = async(photoData) => {
    try{
      const isValidPhotoData = await Photo.create(photoData);

      return isValidPhotoData

    } catch(err){
        throw err
    }
    
}

exports.getAll = () => Photo.find().populate('owner').lean();

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner').populate('comments.user').lean();

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData).lean();

exports.addComment = async(photoId, commentData) => {
    const photo = await Photo.findById(photoId);

    photo.comments.push(commentData);

    return photo.save();
};

exports.getByOwner = (userId) => Photo.find({owner: userId}).lean();