import PostForm from "@/components/post-form"

interface EditPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params
  return <PostForm postId={slug} isEdit={true} />
}
