import mongoose from "mongoose";

const PersonSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required'],
            trim: true,
            minLength: [3, `Minimum Length of Name is 3 Characters`],
            maxLength: [32, `Maximum Length of Name is 32 Characters`]
        },
        username: {
            type: String,
            trim: true,
            unique: true,
            minLength: [3, `Minimum Length of Name is 3 Characters`],
            maxLength: [32, `Maximum Length of Name is 32 Characters`]
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: [3, `Minimum Length of Email is 3 Characters`],
            maxLength: [32, `Maximum Length of Email is 32 Characters`],
            validate: {
                validator: function (value) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
                },
                message: 'Email is not valid'
            }
        },
        image: {
            type: String,
        },
        designation: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        companyUrl: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        ipPhone: {
            type: String
        },
        address: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true
    }
)

PersonSchema.pre('save', function (next) {
    if (!this.isModified('email')) {
        return next();
    }

    const emailParts = this.email.split('@');
    if (emailParts.length > 0) {
        this.username = emailParts[0];
    }

    next();
});


export const Person = mongoose.model('Person', PersonSchema)