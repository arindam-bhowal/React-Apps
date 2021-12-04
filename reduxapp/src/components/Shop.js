import React from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index'

const Shop = () => {
    const dispatch = useDispatch();
    const { withdrawMoney, depositeMoney } = bindActionCreators(actionCreators, dispatch)
    return (
        <div>
            <h1>Buy Abibas shoes 50 Rs</h1>
            {/* <button className="btn btn-primary mx-1" onClick={()=> {dispatch(actionCreators.withdrawMoney(100))}}>-</button>
            Add this item
            <button className="btn btn-primary mx-1" onClick={()=> {dispatch(actionCreators.depositeMoney(100))}}>+</button> */}
            <button className="btn btn-primary mx-1" onClick={() => withdrawMoney(100)}>-</button>
            Add this item
            <button className="btn btn-primary mx-1" onClick={() => depositeMoney(100)}>+</button>
        </div>
    )
}

export default Shop
