import {
  Directive,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ContentChildren,
  ContentChild,
  QueryList,
  AfterContentInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { OnChanges, TypedChanges } from '../../../types/angular/typed-changes';
import {
  ICommandBarItemOptions,
  ICommandBarItemOptionsRenderContext,
  ICommandBarItemOptionsRenderIconContext,
} from '../command-bar.component';
import { IContextualMenuItem, ICommandBarItemProps } from 'office-ui-fabric-react';
import { ContextualMenuItemDirective } from '../../contextual-menu';
import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';
import { Subscription } from 'rxjs';

export type CommandBarItemChangedPayload = ItemChangedPayload<ICommandBarItemOptions['key'], ICommandBarItemOptions>;

/**
 * Wrapper directive to allow rendering a custom item to a CommandBarItem.
 */
@Directive({ selector: 'fab-command-bar-item > render' })
export class CommandBarItemRenderDirective {
  @ContentChild(TemplateRef) readonly templateRef: TemplateRef<ICommandBarItemOptionsRenderContext>;
}

/**
 * Wrapper directive to allow rendering a custom icon to a CommandBarItem.
 */
@Directive({ selector: 'fab-command-bar-item > render-icon' })
export class CommandBarItemRenderIconDirective {
  @ContentChild(TemplateRef) readonly templateRef: TemplateRef<ICommandBarItemOptionsRenderIconContext>;
}

@Directive({ selector: 'fab-command-bar-item' })
export class CommandBarItemDirective extends ContextualMenuItemDirective
  implements ICommandBarItemOptions, AfterContentInit {
  @ContentChild(CommandBarItemRenderDirective) readonly renderDirective: CommandBarItemRenderDirective;
  @ContentChild(CommandBarItemRenderIconDirective) readonly renderIconDirective: CommandBarItemRenderIconDirective;

  // ICommandBarItemOptions implementation
  @Input() iconOnly?: ICommandBarItemOptions['iconOnly'];
  @Input() buttonStyles?: ICommandBarItemOptions['buttonStyles'];
  @Input() cacheKey?: ICommandBarItemOptions['cacheKey'];
  @Input() renderedInOverflow?: ICommandBarItemOptions['renderedInOverflow'];
  @Input() render: ICommandBarItemOptions['render'];
  @Input() renderIcon: ICommandBarItemOptions['renderIcon'];

  ngAfterContentInit() {
    super.ngAfterContentInit();

    if (this.renderDirective && this.renderDirective.templateRef) {
      this.render = this.renderDirective.templateRef;
    }

    if (this.renderIconDirective && this.renderIconDirective.templateRef) {
      this.renderIcon = this.renderIconDirective.templateRef;
    }
  }
}