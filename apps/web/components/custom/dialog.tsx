import { Button } from "@workspace/ui/components/button"
import { DialogTrigger , DialogHeader , DialogTitle , DialogContent , DialogDescription, DialogFooter, DialogClose, Dialog} from "@workspace/ui/components/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import * as z from "zod"
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {InputGroup, InputGroupAddon, InputGroupInput, InputGroupText} from "@workspace/ui/components/input-group"
import { AlertCircleIcon, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@workspace/ui/components/alert"

const formSchema = z.object({ 
  url: z.string().min(5, "url but be at least 5 characters"), 
})

export default function WebsiteDialog(){   
const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      url:"",
    }
})
    function onSubmit(data: z.infer<typeof formSchema>){ 

      console.log(data);
    }

    return (<Dialog>
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
            <Button type="submit">Save changes</Button>
        </DialogFooter>
    </form>
      </DialogContent>
    </Dialog>
    )
}



