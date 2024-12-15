const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const service = require("../db/models/service");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signup = catchAsync(async(req, res, next) => {
    const body = req.body;
    if(!['1', '2'].includes(body.userType)){
        throw new AppError('Invalid user type.', 400);
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });

    if(!newUser) {
        return next(new AppError('Failed to create the user.', 400));
    }

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id,
    });

    return res.status(201).json({
        status: 'Success',
        data: result,
    });
});

const login = catchAsync(async (req, res, next) => {
    const {email, password } = req.body;
    if(!email || !password) {
        return next(new AppError('Please provide a valid email and password.', 400));
    }

    const result = await user.findOne({where: { email } });
    //se verifica si las contrasenas concuerdan asi como si el email existe
    //se dejan en la misma validacion para dar menos informacion para mayor seguridad
    if(!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Please provide a valid email and password.', 401));
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: 'success',
        token,
    });

});

const createService = catchAsync(async(req, res, next) => {
    const body = req.body;

    const newService = await service.create({
        documentType: body.documentType,
        serviceType: body.serviceType,
        address: body.address,
        scheduledServiceTime: body.scheduledServiceTime,
        clientID: body.clientID,
        lat: body.lat,
        lon: body.lon,
        senderAddress: body.senderAddress,
        routeNumber:body.routeNumber
    });

    if(!newService) {
        return next(new AppError('Failed to create service.', 400));
    }

    const result = newService.toJSON();

    return res.status(201).json({
        status: 'Success',
        data: result,
    });
});

const getServices = catchAsync(async (req, res, next) => {

    const result = await service.findAll();

    return res.json({
        status: 'success',
        response: result
    });

});

module.exports = { signup, login, getServices, createService };