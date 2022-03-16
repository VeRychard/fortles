import { Application, Request, Response } from "../";
import { Template, TemplateFactory } from "../template/index.js";

export default abstract class RenderEngine{

    /**
     * Renders the whole tree from the given controller.
     * @param request 
     * @param response 
     */
    public abstract dispatch(request: Request, response: Response): void;

    /**
     * Fired before the response
     * @param request 
     * @param response 
     */
    public beforeDispatch(request: Request, response: Response){}

    /**
     * 
     * @param request 
     * @param response 
     */
    public afterDispatch(request: Request, response: Response){} 
}

export enum RenderEngineContentPlace{
    HEADER,
    BFEORE_CONTENT,
    AFTER_CONTENT
}

export abstract class ContentAvareRenderEngine extends RenderEngine{
    public abstract addScriptAsset(path: string, place? : RenderEngineContentPlace): void;
    public abstract addStyleAsset(path: string, place? : RenderEngineContentPlace): void;
}

export abstract class TemplateRenderEngine extends ContentAvareRenderEngine{

    protected templates = new TemplateFactory();

    public getTemplate(name: string): Template{
        return this.templates.get(name);
    }

    public getTemplateFactory(): TemplateFactory{
        return this.templates;
    }
}