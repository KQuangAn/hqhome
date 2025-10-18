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
import { createBrand, updateBrand } from '@/lib/actions/product.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const brandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
});

type BrandFormData = z.infer<typeof brandSchema>;

export default function BrandForm({
  type,
  brand,
}: {
  type: 'Create' | 'Update';
  brand?: { id: string; name: string; slug: string };
}) {
  const router = useRouter();

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name || '',
      slug: brand?.slug || '',
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: BrandFormData) {
    try {
      if (type === 'Create') {
        const res = await createBrand(values);
        if (res.success) {
          toast({
            title: 'Success',
            description: 'Brand created successfully',
          });
          router.push('/admin/brands');
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: res.message,
          });
        }
      } else {
        const res = await updateBrand({
          id: brand!.id,
          ...values,
        });
        if (res.success) {
          toast({
            title: 'Success',
            description: 'Brand updated successfully',
          });
          router.push('/admin/brands');
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
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
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

        <Button type="submit" className="w-full">
          {type === 'Create' ? 'Create Brand' : 'Update Brand'}
        </Button>
      </form>
    </Form>
  );
}
