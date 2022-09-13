import React, {
  useState, Fragment, ReactNode, useCallback, useEffect,
} from 'react';
import {
  ChevronRight,
} from 'react-feather';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import '@styles/base/plugins/forms/form-wizard.scss';
import classNames from 'classnames';
import Stepper from '@utils/Stepper';

export interface WizardStep {
  id: string,
  title: string,
  subtitle: string,
  icon: ReactNode,
  content: ReactNode,
}

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string,
  separator?: ReactNode,
  headerClassName: string,
  contentClassName: string,
  steps: Array<WizardStep>,
  stepper?: Stepper,
}

function renderHeader(props: WizardProps, activeIndex: number, onClick: (index: number) => void) {
  const { steps, separator = <ChevronRight size={16} /> } = props;
  return (
    <>
      {
        steps.map((step, index) => (
          <Fragment key={step.id}>
            {index !== 0 && index !== steps.length ? <div className="line">{separator}</div> : null}
            <div
              className={classNames('step', {
                crossed: activeIndex > index,
                active: index === activeIndex,
              })}
              data-target={`#${step.id}`}
              onClick={() => onClick(index)}
            >
              <button type="button" className="step-trigger">
                <span className="bs-stepper-box">{step.icon ? step.icon : index + 1}</span>
                <span className="bs-stepper-label">
                  <span className="bs-stepper-title">{step.title}</span>
                  {step.subtitle ? <span className="bs-stepper-subtitle">{step.subtitle}</span> : null}
                </span>
              </button>
            </div>
          </Fragment>
        ))
      }
    </>
  );
}

function renderContent(props: WizardProps, activeIndex: number) {
  const { steps, contentClassName } = props;
  return (
    <>
      {
        steps.map((step, index) => (
          <div
            className={classNames('content', contentClassName, {
              'active dstepper-block': activeIndex === index,
            })}
            id={step.id}
            key={step.id}
          >
            {step.content}
          </div>
        ))
      }
    </>
  );
}

export default function Wizard(props: WizardProps) {
  const {
    className, type = 'horizontal', headerClassName, steps, stepper,
  } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const next = useCallback(() => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  }, [steps, activeIndex]);
  const prev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  }, [steps, activeIndex]);
  useEffect(() => {
    stepper?.setListener(next, prev);
  }, [next, prev, stepper]);
  return (
    <div
      className={classNames('bs-stepper', className, {
        vertical: type === 'vertical',
        'vertical wizard-modern': type === 'modern-vertical',
        'wizard-modern': type === 'modern-horizontal',
      })}
    >
      <div className={classNames('bs-stepper-header', headerClassName)}>{renderHeader(props, activeIndex, () => {})}</div>
      <div className="bs-stepper-content">
        {renderContent(props, activeIndex)}
      </div>
    </div>
  );
}
