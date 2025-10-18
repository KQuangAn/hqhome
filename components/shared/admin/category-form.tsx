'use client';

import slugify from 'slugify';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { createCategory, updateCategory } from '@/lib/actions/product.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  parentId: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryForm({
  type,
  category,
  categories = [],
}: {
  type: 'Create' | 'Update';
  category?: { id: string; name: string; slug: string; parentId?: string | null };
  categories?: Array<{ id: string; name: string; slug: string }>;
}) {
  const router = useRouter();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
      parentId: category?.parentId || '',
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: CategoryFormData) {
    try {
      if (type === 'Create') {
        const res = await createCategory(values);
        if (res.success) {
          toast({
            title: 'Success',
            description: 'Category created successfully',
          });
          router.push('/admin/categories');
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: res.message,
          });
        }
      } else {
        const res = await updateCategory({
          id: category!.id,
          ...values,
        });
        if (res.success) {
          toast({
            title: 'Success',
            description: 'Category updated successfully',
          });
          router.push('/admin/categories');
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: res.message,
          });
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  }

  const generateSlug = () => {
    const name = form.getValues('name');
    if (name) {
      form.setValue('slug', slugify(name, { lower: true }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter slug" {...field} />
                  </FormControl>
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">No Parent</SelectItem>
                  {categories
                    .filter((cat) => cat.id !== category?.id) // Don't allow self-reference
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {type === 'Create' ? 'Create Category' : 'Update Category'}
        </Button>
      </form>
    </Form>
  );
}
