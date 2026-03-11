"use client"
import { Button } from "@workspace/ui/components/button"
import { DialogTrigger , DialogHeader , DialogTitle , DialogContent , DialogDescription, DialogFooter, DialogClose, Dialog} from "@workspace/ui/components/dialog";
import { Field, FieldError, FieldGroup } from "@workspace/ui/components/field";
import * as z from "zod"
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {InputGroup, InputGroupAddon, InputGroupInput, InputGroupText} from "@workspace/ui/components/input-group"
import { AlertCircleIcon, Loader2Icon, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { useState } from "react";
import { useWebsite } from "@/hooks/useWebsites";
import { toast } from "sonner";

const formSchema = z.object({ 
  url: z.string().min(5, "url but be at least 5 characters"), 
})

export default function WebsiteDialog(){   
  const [open , setOpen] = useState(false);
  const [loading , setloading] = useState(false);
  const { createWebsite } = useWebsite()

const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      url:"",
    }
})
    async function onSubmit(data: z.infer<typeof formSchema>){ 
      setloading(true);
      try{ 
        const url = 'https://'+data.url;
        if(!url){
          return;
        }      
        console.log(url)
        const response = await createWebsite(url)

        if(!response){ 
          toast.error("faild add new site please again check the url")
          return;
        }

        toast.success(`site added successfully`)
        console.log(data)
      }catch(error){
        console.error(error)
      }finally{ 
        setOpen(false)
      }
    }

    return (<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Website <Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
      <form  onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>website url</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="mb-3" >
          <FieldGroup>
            <Controller
                    name="url"
                    control={form.control}
                    render={({field , fieldState}) =>( 
                      <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id="url-1"
                      aria-invalid={fieldState.invalid}
                      autoCapitalize="off"
                    placeholder="example.com" className="pl-0.5!" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>.com</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    <Alert variant="default" className="max-w-md mt-3">
                      <AlertCircleIcon />
                      <AlertDescription>
                      🌐 Type your domain the simple way — yoursite.com, blog.yoursite.com, you get the idea. Skip the https:// part, we handle that. We'll ping it every 3 minutes and live-update your dashboard. Got a Down status right away? Your URL might have a small typo — worth a second look!
                      </AlertDescription>
                    </Alert>
                </Field>
                    )}
                  />
          </FieldGroup>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
            <Button disabled={loading} type="submit">
              {loading ? (<Loader2Icon className="size-4 animate-spin transition-all ease-in duration-300 " />) :  <span>add</span>}
            </Button>
        </DialogFooter>
    </form>
      </DialogContent>
    </Dialog>
    )
}



