// skipped exercises 4.6 and 4.7 (for now...)

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    else if(blogs.length === 1){
        return blogs[0].likes
    }
    else{ // more than 1 blog
        return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
    }
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    else if(blogs.length === 1){
        return blogs[0]
    }
    else{
        let maxLikes = 0
        let favBlog = {}
        blogs.forEach(blog => {
            if(blog.likes >= maxLikes){
                maxLikes = blog.likes
                favBlog = blog
            }
        })

        return favBlog
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}