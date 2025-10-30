import mongoose, { Document, Schema } from 'mongoose'

export interface IBlogPost extends Document {
  slug: string
  title: {
    es: string
    en: string
  }
  excerpt: {
    es: string
    en: string
  }
  content: {
    es: string
    en: string
  }
  image: string
  date: string
  author: {
    name: string
    role: {
      es: string
      en: string
    }
  }
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    es: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    en: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    }
  },
  excerpt: {
    es: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    en: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    }
  },
  content: {
    es: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      es: {
        type: String,
        required: true,
        trim: true
      },
      en: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
