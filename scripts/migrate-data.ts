import connectDB from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth"
import { blogPosts } from "@/lib/blog-data"

async function migrateData() {
  try {
    console.log("🔄 Iniciando migración de datos...")
    
    // Conectar a MongoDB
    await connectDB()
    console.log("✅ Conectado a MongoDB")

    // Crear usuario administrador por defecto
    const existingUser = await User.findOne({ username: "admin" })
    if (!existingUser) {
      const hashedPassword = await hashPassword("admin123")
      const adminUser = new User({
        username: "admin",
        password: hashedPassword
      })
      await adminUser.save()
      console.log("✅ Usuario administrador creado (admin/admin123)")
    } else {
      console.log("ℹ️ Usuario administrador ya existe")
    }

    // Migrar posts existentes
    let migratedCount = 0
    let skippedCount = 0

    for (const postData of blogPosts) {
      const existingPost = await BlogPost.findOne({ slug: postData.slug })
      
      if (!existingPost) {
        const post = new BlogPost({
          ...postData,
          published: true
        })
        await post.save()
        migratedCount++
        console.log(`✅ Post migrado: ${postData.title.es}`)
      } else {
        skippedCount++
        console.log(`ℹ️ Post ya existe: ${postData.title.es}`)
      }
    }

    console.log(`\n🎉 Migración completada!`)
    console.log(`📊 Estadísticas:`)
    console.log(`   - Posts migrados: ${migratedCount}`)
    console.log(`   - Posts existentes: ${skippedCount}`)
    console.log(`   - Total procesados: ${blogPosts.length}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error durante la migración:", error)
    process.exit(1)
  }
}

// Ejecutar migración si se llama directamente
if (require.main === module) {
  migrateData()
}

export default migrateData
