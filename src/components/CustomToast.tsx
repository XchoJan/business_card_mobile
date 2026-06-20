import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { setToastVisible } from "../store/features/booleans/toastVisible.ts";
import ErrorIcon from "../assets/icons/ErrorIcon";
import {appConfig} from "../core/constants/app-config";

interface ToastState {
    isVisible: boolean;
    type: string;
    errorText?: string
    successText?: string
    text?: string
}
const CustomToast = () => {
    const dispatch = useDispatch();
    const toastState: ToastState = useSelector((store) => store.toastVisible.toastVisible);
    const timeoutRef = useRef(null);


    const toastVisible = useSelector((store: any) => store?.toastVisible.toastVisible);
    console.log(toastVisible, 'toastVisible')

    useEffect(() => {
        if (toastState.isVisible) {
            // Очистить предыдущий таймер, если он существует
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Установить новый таймер
            timeoutRef.current = setTimeout(() => {
                dispatch(setToastVisible({ isVisible: false, type: toastState.type }));
                timeoutRef.current = null;
            }, 2500);
        }

        // Очистка при размонтировании компонента
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [toastState.isVisible, dispatch]);

    return (
        <Modal
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            isVisible={toastState.isVisible}
            coverScreen={false}
            hasBackdrop={false}
            style={styles.modalContainer}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
        >
            <View style={styles.modal}>
                {toastState.type === 'copy' && (
                    <View style={styles.copyContainer}>
                        <ErrorIcon />
                        <Text style={styles.copyTitle}>{toastState.text}</Text>
                    </View>
                )}

                {toastState.type === 'success' && (
                    <View style={styles.successContainer}>
                        <ErrorIcon />
                        <Text style={styles.copyTitle}>{toastState.text}</Text>
                    </View>
                )}

                {toastState.type === 'error' && (
                    <View style={[styles.errorContainer]}>
                        <ErrorIcon/>
                        <Text style={styles.copyTitle}>
                            {toastState.text}
                        </Text>
                    </View>
                )}
            </View>
        </Modal>
    );
};

export default CustomToast;

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-start',
        margin: 0,
        pointerEvents: 'box-none',
        marginTop: 48
    },
    modal: {
        width: appConfig.windowWidth - 32,
        height: 40,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        alignSelf: 'center'
    },
    copyContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#8E8E93',
        position: 'absolute',
        zIndex: 9999,
        borderRadius: 12,
        height: 48,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    successContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#42b618',
        position: 'absolute',
        zIndex: 9999,
        borderRadius: 12,
        height: 48,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    copyTitle: {
        color: '#FFFFFF',
        marginLeft: 14,
        fontSize: 16,
        fontWeight: '400',
        maxWidth: '80%'
    },
    errorContainer: {
        flex: 1,
        width: '98%',
        alignSelf: 'center',
        backgroundColor: '#FF2D52',
        position: 'absolute',
        zIndex: 9999,
        borderRadius: 12,
        height: 48,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 16
    },
});
