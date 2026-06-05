"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/redux-hooks";
import { setUser, type ReduxUser } from "@/store/slices/user-slice";

export function UserStateHydrator({ user }: { user?: ReduxUser | null }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user ?? null));
  }, [dispatch, user]);

  return null;
}
