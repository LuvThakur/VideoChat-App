import React from 'react'
import { FormProvider as HookFormProvider } from 'react-hook-form';

export default function FormProvider({ children, onSubmit, methods }) {
    return (

        <HookFormProvider {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </HookFormProvider>
    )
}
