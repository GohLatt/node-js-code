const Tour = require("./../modal/tourModal");
const resError = require("./../utlis/resError");
const APIFeatures = require("./../utlis/apiFeacture");
const catchAsync = require("./../utlis/catchAsync");

exports.aliasTopCheap = (req, res, next) => {
  req.query.limit = "2";
  req.query.sort = "price";
  req.query.fields = "name,price,rating";
  next();
};

exports.getAllTour = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate();

  const tours = await features.query;
  const tourall = await Tour.countDocuments();

  res.status(200).json({
    status: "success",
    result: tours.length,
    tourall,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const tours = await Tour.findById(req.params.id);

  if (!tours) return resError(res, 404, "Invalid Id");

  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newTour,
    },
  });
});

exports.editTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) return resError(res, 404, "Invalid Id");

  res.status(200).json({
    status: "success",
    data: {
      updateTour: tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const deleteTour = await Tour.findByIdAndDelete(req.params.id);

  if (!deleteTour) return resError(res, 404, "Invalid Id");

  res.status(200).json({
    status: "success",
    data: {
      deleteTour,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { rating: { $gte: 4.8 } },
    },
    {
      $group: {
        avgPrice: { $sum: "$price" },
        avgDuration: { $sum: "$duration" },
        _id: null,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
