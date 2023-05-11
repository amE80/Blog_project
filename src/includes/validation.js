import {Form , Field, defineRule , ErrorMessage , configure  } from 'vee-validate';
import  { required , email , max , min} from '@vee-validate/rules'

export default{
    install (app){
        app.component('Form' , Form);
        app.component('Field', Field);
        app.component("ErrorMessage",ErrorMessage);

        defineRule('required', required);
        defineRule("email",email);
        defineRule('max' , max);
        defineRule('min',min);

        configure({
            generateMessage: (ctx)=>{
                const messages ={
                    required: ` You must fill ${ctx.field} field! `,
                    email:`it isn't a correct email address`,
                    max: `it's too long`,
                    min: `it's too short`,
                };
                const message = messages[ctx.rule.name] ? messages[ctx.rule.name]: `this field is invalid`;
                return message;
            },
            validateOnBlur:true,
            validateOnChange: true,
            validateOnInput : true,
            validateOnModelUpdate: true
        });
     
    }


}