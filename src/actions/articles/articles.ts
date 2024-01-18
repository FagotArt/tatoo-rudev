'use server'

import Article from "@/lib/models/article"

export const getArticle = async (slug:any) => {
    const article = await Article.findOne({ slug })
    return article
}

export const getArticles = async (search?:any) => {
    try {
        let query = {}
        if (search) {
            query = {$text: {$search: search}}
        }

        const articles = await Article.find(query).sort({ createdAt: -1 })
        return articles
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteArticle = async (id:any) => {

    try {
        const article = await Article.findByIdAndDelete(id)
        return article
    } catch (error) {
        console.log(error)
        return {
            error: 'Something went wrong'
        }
    }
}