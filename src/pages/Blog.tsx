import { Section } from "@/components/ui/section";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string | null;
  author: string;
  category: string;
  read_time: number;
  published_at: string;
}

const BlogCardSkeleton = () => (
  <div className="bg-surface border border-line rounded-lg overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, featured_image, author, category, read_time, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const categories = ["All", ...new Set(posts?.map((p) => p.category) || [])];

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts?.filter((p) => p.category === selectedCategory);

  return (
    <Layout
      seoTitle="Blog | Orlando Digital Marketing Insights | ProjGrowth"
      seoDescription="Expert insights on web design, branding, and digital marketing for Orlando businesses. Tips, strategies, and industry trends from ProjGrowth."
      seoKeywords="Orlando marketing blog, web design tips, branding insights, digital marketing Orlando, content marketing strategies"
      canonicalUrl="/blog"
    >
      <Section>
        <Breadcrumbs />

        <ScrollReveal>
          <PageHeader className="mb-12 md:mb-16">
            <h1 className="font-display text-text mb-6">
              Insights & Resources
            </h1>
            <p className="text-xl text-mute max-w-2xl">
              Expert perspectives on web design, branding, and digital marketing 
              strategies for Orlando and Central Florida businesses.
            </p>
          </PageHeader>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10 border-b border-line pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="chip-filter"
                data-active={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <motion.div 
            layout 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <motion.article 
                  layout
                  className="group bg-surface border border-line rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-sm"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video bg-base relative overflow-hidden">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-md"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                          <span className="text-accent text-4xl font-bold opacity-50">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="pill-accent">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-lg font-medium text-text mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-mute mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-mute">
                        <span>
                          {format(new Date(post.published_at), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              </ScrollReveal>
            ))}
          </motion.div>
        ) : (
          <div className="text-center section-sm">
            <p className="text-mute">No blog posts found.</p>
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default Blog;
